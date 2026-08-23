import dayjs from "dayjs"

const now = dayjs()

export const dateFilters = {

  Today() {
    const start = now.startOf("day").toDate()
    const end = now.endOf("day").toDate()

    return {
      gte: start,
      lte: end
    }
  },

  Last7Days() {
    const start = now.subtract(7, "day").startOf("day").toDate()
    const end = now.endOf("day").toDate()

    return {
      gte: start,
      lte: end
    }
  },

  Last30Days() {
    const start = now.subtract(30, "day").startOf("day").toDate()
    const end = now.endOf("day").toDate()

    return {
      gte: start,
      lte: end
    }
  },

  LastSixMonths(){
const start = now.subtract(30, "months").startOf("day").toDate()
const end = now.endOf("day").toDate()

return {
    gte:start,
    lte:end
}
  }

}