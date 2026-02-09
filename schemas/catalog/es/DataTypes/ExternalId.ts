import z from "zod";

import * as ExternalIds from '../../common/ExternalIds';

export const TVExternalId = z.string()
  .regex(ExternalIds.TV, "Formato de ID externo inválido");

