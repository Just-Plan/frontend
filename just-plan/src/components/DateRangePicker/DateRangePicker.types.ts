import { SetStateAction } from "jotai"
import { Dispatch } from "react"
import { DateRange } from "react-day-picker"

export interface IProps {
  setDate: Dispatch<SetStateAction<DateRange | undefined>>
  date: DateRange | undefined
}