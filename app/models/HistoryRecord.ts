import { types } from "mobx-state-tree"

export const HistoryRecordModel = types
  .model("HistoryRecord")
  .props({
    date_time: types.string,
    name: types.string,
    time: types.number,
    rest: types.number,
    hr: types.number,
    points: types.number,
    exercises: types.string,
  })
  .actions((self) => ({
    setName(value: string) {
      self.name = value
    },
    setPoints(value: number) {
      self.points = value
    },
  }))
