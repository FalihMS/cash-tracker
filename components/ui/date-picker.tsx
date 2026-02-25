"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { getTodayISOString } from "@/lib/utils"


function isoToDate(iso?: string) {
  if (!iso) return undefined
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

function dateToISO(date?: Date) {
  if (!date) return ""
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

function getToday() {
  const d = new Date()
  const offset = d.getTimezoneOffset()
  return new Date(d.getTime() - offset * 60000)
}

export function DatePickerSimple({
  selected,
  onSelect,
}: {
  selected?: string,
  onSelect?: (iso: string) => void
}) {

  const [date, setDate] = React.useState<Date>(getToday())
  
  function handleDateSelected(d?: Date) {
    if (!d) return
    setDate(d)
    onSelect?.(dateToISO(d))
  }

  return (
    <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-simple"
            className="justify-start font-normal"
          >
            {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={isoToDate(selected)}
            onSelect={(d) => handleDateSelected(d)}
            defaultMonth={date}
            className="rounded-lg border w-full"
          />
        </PopoverContent>
      </Popover>
  )
}
