import { Command, flags } from '@oclif/command'
import { run } from '../util/process'

export default class ExtractFirmware extends Command {
  static description = 'extract firmware partitions'

  static flags = {
    help: flags.help({char: 'h'}),
    factoryOtaPath: flags.string({char: 'f', description: 'path to stock factory OTA images zip (for extracting firmware if stockSrc is not factory images)', required: true}),
  }

  static args = [
    {name: 'config', description: 'path to device-specific YAML config', required: true},
  ]

  async run() {
    let {flags: {factoryOtaPath}, args: {config: configPath}} = this.parse(ExtractFirmware)
    let images_out = "/tmp/adevtool-test/"
    await run(__dirname + `/../../external/extract_android_ota_payload/extract_android_ota_payload.py ${factoryOtaPath} ${images_out}`)
  }
}
