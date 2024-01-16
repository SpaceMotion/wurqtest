import { flow, Instance, types } from "mobx-state-tree"
import { api } from "app/services/api"
import { HistoryRecordModel } from "app/models/HistoryRecord"

export const HistoryStoreModel = types
  .model("HistoryStore")
  .props({
    points_per_wod: types.optional(types.array(types.number), []),
    history: types.optional(types.array(HistoryRecordModel), []),
  })
  .actions((self) => ({
    fetch: flow(function* () {
      const data = yield api.getHistory()

      if (data !== null && !data.kind) {
        self.points_per_wod = data.points_per_wod
        self.history = data.history
      }
    }),
  }))

export interface HistoryStore extends Instance<typeof HistoryStoreModel> {}
