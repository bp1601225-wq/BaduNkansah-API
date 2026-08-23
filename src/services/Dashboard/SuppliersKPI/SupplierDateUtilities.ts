import dayjs from "dayjs";


export const SupplierKPIDates = {

ThisMonth(){
const now = dayjs()

const startDate = now.startOf("month").toDate()
const endDate = now.endOf("day").toDate()

return {
   gte:startDate,
   lte:endDate
}

}


}