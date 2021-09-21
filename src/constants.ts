import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export const ADDRESS_ZERO = Address.fromString('0x0000000000000000000000000000000000000000')

export const BIG_DECIMAL_1E6 = BigDecimal.fromString('1e6')

export const BIG_DECIMAL_1E12 = BigDecimal.fromString('1e12')

export const BIG_DECIMAL_1E18 = BigDecimal.fromString('1e18')

export const BIG_DECIMAL_ZERO = BigDecimal.fromString('0')

export const BIG_DECIMAL_ONE = BigDecimal.fromString('1')

export const BIG_INT_ONE = BigInt.fromI32(1)

export const BIG_INT_ONE_DAY_SECONDS = BigInt.fromI32(86400)

export const BIG_INT_ZERO = BigInt.fromI32(0)

export const FACTORY_ADDRESS = Address.fromString('0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac')

export const MASTER_CHEF_ADDRESS = Address.fromString('0xfB85B9Ec50560e302Ab106F1E2857d95132120D0')

export const SDAO_TOKEN_ADDRESS = Address.fromString('0x993864E43Caa7F7F12953AD6fEb1d1Ca635B875F')

export const SDAO_USDT_PAIR_ADDRESS = Address.fromString('0x3a925503970d40d36d2329e3846e09fcfc9b6acb')

export const WETH_ADDRESS = Address.fromString('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')

export const SUSHISWAP_WETH_USDT_PAIR_ADDRESS = Address.fromString('0x06da0fd433c1a5d7a4faa01111c044910a184553')

export const USDT_ADDRESS = Address.fromString('0xdac17f958d2ee523a2206206994597c13d831ec7')

export const MASTER_CHEF_START_BLOCK = BigInt.fromI32(13258943)
