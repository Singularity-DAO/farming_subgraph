import {
  SDAOTokenStaking as SDAOTokenStaking,
  Deposit,
  EmergencyWithdraw,
  ExtendPool,
  Harvest,
  LogPoolAddition,
  LogUpdatePool,
  OwnershipTransferred,
  RewardsAdded,
  Withdraw, AddCall, MassUpdatePoolsCall, ExtendPoolCall
} from "../generated/SDAOTokenStaking/SDAOTokenStaking"
import { History, MasterChef, Pool, PoolHistory, User } from '../generated/schema'
import { Address, BigDecimal, BigInt, dataSource, ethereum, log } from '@graphprotocol/graph-ts'

let BIG_INT_ZERO = BigInt.fromString('0')
let BIG_DECIMAL_ZERO = BigDecimal.fromString('0')
let BIG_INT_ONE_DAY_SECONDS = BigInt.fromString('86400')
let BIG_INT_ONE = BigInt.fromString('1')


export function getMasterChef(block: ethereum.Block): MasterChef {
  log.info('getMasterChef', [])

  let masterChef = MasterChef.load(dataSource.address().toHex())

  if (masterChef === null) {
    const contract = SDAOTokenStaking.bind(dataSource.address())
    masterChef = new MasterChef(dataSource.address().toHex())

    masterChef.owner = contract.owner()
    masterChef.totalRewardsReceived = contract.totalRewardsReceived()
    masterChef.rewardsToken = contract.rewardsToken()
    masterChef.updatedAt = block.timestamp

    masterChef.save()
  }

  return masterChef as MasterChef
}

export function getPool(id: BigInt, block: ethereum.Block): Pool {
  log.info('getPool', [])
  let pool = Pool.load(id.toString())

  if (pool === null) {
    const masterChef = getMasterChef(block)

    const masterChefContract = SDAOTokenStaking.bind(dataSource.address())
    const poolLength = masterChefContract.poolLength()

    if (id >= poolLength) {
      return null
    }

    // Create new pool.
    pool = new Pool(id.toString())

    // Set relation
    pool.owner = masterChef.id

    const poolInfo = masterChefContract.poolInfo(masterChef.poolCount)

    pool.tokenPerBlock = poolInfo.value0
    pool.block = poolInfo.value1
    pool.lastRewardBlock = poolInfo.value2
    pool.accRewardsPerShare = poolInfo.value3
    pool.timestamp = block.timestamp
    pool.block = block.number
    pool.updatedAt = block.timestamp

    pool.save()
  }

  return pool as Pool
}

function getHistory(owner: string, block: ethereum.Block): History {
  log.info('getHistory', [])
  const day = block.timestamp.div(BIG_INT_ONE_DAY_SECONDS)

  const id = owner.concat(day.toString())

  let history = History.load(id)

  if (history === null) {
    history = new History(id)
    history.owner = owner
    history.slpBalance = BIG_DECIMAL_ZERO
    history.slpAge = BIG_DECIMAL_ZERO
    history.slpAgeRemoved = BIG_DECIMAL_ZERO
    history.slpDeposited = BIG_DECIMAL_ZERO
    history.slpWithdrawn = BIG_DECIMAL_ZERO
    history.timestamp = block.timestamp
    history.block = block.number
  }

  return history as History
}

function getPoolHistory(pool: Pool, block: ethereum.Block): PoolHistory {
  log.info('getPoolHistory', [])
  const day = block.timestamp.div(BIG_INT_ONE_DAY_SECONDS)

  const id = pool.id.concat(day.toString())

  let history = PoolHistory.load(id)

  if (history === null) {
    history = new PoolHistory(id)
    history.pool = pool.id
    history.slpBalance = BIG_DECIMAL_ZERO
    history.slpAge = BIG_DECIMAL_ZERO
    history.slpAgeRemoved = BIG_DECIMAL_ZERO
    history.slpDeposited = BIG_DECIMAL_ZERO
    history.slpWithdrawn = BIG_DECIMAL_ZERO
    history.timestamp = block.timestamp
    history.block = block.number
  }

  return history as PoolHistory
}

export function getUser(pid: BigInt, address: Address, block: ethereum.Block): User {
  log.info('getUser', [])
  const uid = address.toHex()
  const id = pid.toString().concat('-').concat(uid)

  let user = User.load(id)

  if (user === null) {
    user = new User(id)
    user.pool = null
    user.address = address
    user.amount = BIG_INT_ZERO
    user.rewardDebt = BIG_INT_ZERO
    user.timestamp = block.timestamp
    user.block = block.number
    user.save()
  }

  return user as User
}

export function add(event: AddCall): void {
  const masterChef = getMasterChef(event.block)

  log.info('Add pool #{}', [masterChef.poolCount.toString()])

  const pool = getPool(masterChef.poolCount, event.block)

  if (pool === null) {
    log.error('Pool added with id greater than poolLength, pool #{}', [masterChef.poolCount.toString()])
    return
  }

  // Update MasterChef.
  masterChef.totalRewardsReceived = masterChef.totalRewardsReceived.plus(pool.tokenPerBlock)
  masterChef.poolCount = masterChef.poolCount.plus(BIG_INT_ONE)
  masterChef.save()
}

export function extendPool(call: ExtendPoolCall): void {
  log.info('Set pool id: {} tokenPerBlock: {} withUpdate: {}', [
    call.inputs._pid.toString(),
    call.inputs._sdaoPerBlock.toString(),
    call.inputs._endOfEpochBlock.toString()
  ])

  const pool = getPool(call.inputs._pid, call.block)
  const masterChef = getMasterChef(call.block)

  // Update masterchef
  masterChef.totalRewardsReceived = masterChef.totalRewardsReceived.plus(call.inputs._sdaoPerBlock.minus(pool.tokenPerBlock))
  masterChef.save()

  // Update pool
  pool.tokenPerBlock = call.inputs._sdaoPerBlock
  pool.save()
}

export function massUpdatePools(call: MassUpdatePoolsCall): void {
  log.info('Mass update pools', [])
}


export function handleDeposit(event: Deposit): void {}

export function handleEmergencyWithdraw(event: EmergencyWithdraw): void {}

export function handleExtendPool(event: ExtendPool): void {}

export function handleHarvest(event: Harvest): void {}

export function handleLogPoolAddition(event: LogPoolAddition): void {}

export function handleLogUpdatePool(event: LogUpdatePool): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleRewardsAdded(event: RewardsAdded): void {}

export function handleWithdraw(event: Withdraw): void {}
