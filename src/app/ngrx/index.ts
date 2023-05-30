import { StoreModule } from "@ngrx/store"
import { rootReducer } from "./reducer"

export const store = StoreModule.forRoot(rootReducer);