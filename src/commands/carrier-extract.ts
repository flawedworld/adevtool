import { Command, flags } from '@oclif/command'
import { run } from '../util/process'

export default class CarrierExtract extends Command {
  static description = 'generate CarrierConfig and APN XML files'

  static flags = {
    help: flags.help({char: 'h'}),
    stockSrc: flags.string({char: 's', description: 'path to (extracted) factory images, (mounted) images, (extracted) OTA package, OTA payload, or directory containing any such files (optionally under device and/or build ID directory)', required: true}),
  }

  static args = [
    {name: 'config', description: 'path to device-specific YAML config', required: true},
  ]

  async run() {
    let {flags: {stockSrc}, args: {config: configPath}} = this.parse(CarrierExtract)
    let carriersettings_folder = stockSrc + "product/etc/CarrierSettings"
    let apns_out = "/tmp/adevtool-test/"
    let carriersettings_out = "/tmp/adevtool-test/"
    await run(__dirname + `/../../external/carriersettings-extractor/adevtool-run.bash ${carriersettings_folder} ${apns_out} ${carriersettings_out}`)
  }
}
