# Schemas for ObsidianMD

## Document

_Object containing the following properties:_

| Property             | Type                                                                                       |
| :------------------- | :----------------------------------------------------------------------------------------- |
| `tags`               | `Array<string>` (_nullable_)                                                               |
| `aliases`            | `string` (_optional & nullable_) _or_ `Array<string>` (_optional & nullable_) (_nullable_) |
| `cssclasses`         | `string` (_optional & nullable_) _or_ `Array<string>` (_optional & nullable_) (_nullable_) |
| `publish`            | `boolean`                                                                                  |
| **`permalink`** (\*) | `string`                                                                                   |
| `description`        | `string`                                                                                   |
| `image`              | `string`                                                                                   |
| `cover`              | `string`                                                                                   |

_(\*) Required._
