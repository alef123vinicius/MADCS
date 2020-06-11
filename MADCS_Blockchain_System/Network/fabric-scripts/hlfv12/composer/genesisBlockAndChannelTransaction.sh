export FABRIC_CFG_PATH=$PWD
configtxgen -profile ComposerChannel -channelID composerchannel -outputCreateChannelTx composer-channel.tx
configtxgen -profile ComposerOrdererGenesis -outputBlock composer-genesis.block