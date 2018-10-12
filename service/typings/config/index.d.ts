// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import { EggAppConfig } from 'egg';
import ExportConfigDefault from '../../config/config.default';
import ExportConfigLocal from '../../config/config.local';
import ExportConfigProd from '../../config/config.prod';
import ExportConfigUnittest from '../../config/config.unittest';
type ConfigDefault = ReturnType<typeof ExportConfigDefault>;
type ConfigLocal = ReturnType<typeof ExportConfigLocal>;
type ConfigProd = ReturnType<typeof ExportConfigProd>;
type ConfigUnittest = ReturnType<typeof ExportConfigUnittest>;
declare module 'egg' {
  type NewEggAppConfig = ConfigDefault & ConfigLocal & ConfigProd & ConfigUnittest;
  interface EggAppConfig extends NewEggAppConfig { }
}