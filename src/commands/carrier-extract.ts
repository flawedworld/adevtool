import { Command, flags } from '@oclif/command'
import { run } from '../util/process'
import { readFile } from '../util/fs'

import YAML from 'yaml'

export default class CarrierExtract extends Command {
  static description = 'generate CarrierConfig and APN XML files'

  static flags = {
    help: flags.help({char: 'h'}),
    stockSrc: flags.string({char: 's', description: 'path to (extracted) factory images, (mounted) images, (extracted) OTA package, OTA payload, or directory containing any such files (optionally under device and/or build ID directory)', required: true}),
  }

  static args = [
    {name: 'configPath', description: 'path to device-specific YAML config', required: true},
  ]

  async run() {
    let {args: {configPath}, flags: {stockSrc}} = this.parse(CarrierExtract)

    let config = YAML.parse(await readFile(configPath))
    let vendor = "google"
    let device = config.device.name

    let factoryPath = `${stockSrc}/product/etc/CarrierSettings`
    
    let outDir = `vendor/${vendor}/${device}`
    let proprietaryPath = `${outDir}/proprietary`
    let overlaysPath = `${outDir}/overlays`
    await run(__dirname + `/../../external/carriersettings-extractor/adevtool-run.bash ${factoryPath} ${proprietaryPath} ${overlaysPath}`)
  }
}
