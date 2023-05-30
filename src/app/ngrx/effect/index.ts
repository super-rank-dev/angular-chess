import { EffectsModule } from "@ngrx/effects";
import { UserEffect } from "./user.effect";

export const effects = EffectsModule.forRoot([UserEffect]);