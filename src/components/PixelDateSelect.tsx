"use client";

import { useMemo, useState } from "react";
import {
  PixelDropdown,
  type PixelDropdownOption
} from "@/components/PixelDropdown";
import { composeIsoDate, daysInMonth } from "@/lib/form-controls";

type PixelDateSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
const monthOptions: Array<PixelDropdownOption<number>> = months.map(
  (label, index) => ({
    value: index + 1,
    label
  })
);
const yearOptions: Array<PixelDropdownOption<number>> = years.map((value) => ({
  value,
  label: String(value)
}));

export function PixelDateSelect({
  value,
  onChange
}: PixelDateSelectProps) {
  const initial = value ? value.split("-").map(Number) : [];
  const [day, setDay] = useState<number | undefined>(initial[2]);
  const [month, setMonth] = useState<number | undefined>(initial[1]);
  const [year, setYear] = useState<number | undefined>(initial[0]);

  const availableDays = useMemo(() => {
    const count =
      month && year ? daysInMonth(month, year) : month ? daysInMonth(month, 2024) : 31;
    return Array.from({ length: count }, (_, index) => index + 1);
  }, [month, year]);
  const dayOptions: Array<PixelDropdownOption<number>> = availableDays.map(
    (valueDay) => ({
      value: valueDay,
      label: String(valueDay).padStart(2, "0")
    })
  );

  function changeDay(nextDay?: number) {
    setDay(nextDay);
    onChange(composeIsoDate(nextDay, month, year));
  }

  function changeMonth(nextMonth?: number) {
    const nextMaximum =
      nextMonth && year ? daysInMonth(nextMonth, year) : availableDays.length;
    const nextDay = day && day > nextMaximum ? nextMaximum : day;
    setDay(nextDay);
    setMonth(nextMonth);
    onChange(composeIsoDate(nextDay, nextMonth, year));
  }

  function changeYear(nextYear?: number) {
    const nextMaximum =
      month && nextYear ? daysInMonth(month, nextYear) : availableDays.length;
    const nextDay = day && day > nextMaximum ? nextMaximum : day;
    setDay(nextDay);
    setYear(nextYear);
    onChange(composeIsoDate(nextDay, month, nextYear));
  }

  return (
    <div className="grid grid-cols-[0.8fr_1.5fr_1fr] gap-2">
      <PixelDropdown
        ariaLabel="Dia"
        placeholder="Dia"
        value={day}
        options={dayOptions}
        onChange={changeDay}
      />
      <PixelDropdown
        ariaLabel="Mês"
        placeholder="Mês"
        value={month}
        options={monthOptions}
        onChange={changeMonth}
      />
      <PixelDropdown
        ariaLabel="Ano"
        placeholder="Ano"
        value={year}
        options={yearOptions}
        onChange={changeYear}
      />
    </div>
  );
}
