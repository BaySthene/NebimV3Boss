import { Calendar } from "react-native-calendars"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { CalendarUtils } from "react-native-calendars/src"
import { WidgetCard } from "app/components/Custom/card/WidgetCard"
import { colors, spacing } from "app/theme"
import { List } from "app/components/Custom/card/List"
import { View, ViewStyle } from "react-native"
import { Text, TextProps } from "app/components"
import LottieView from "lottie-react-native"
import { DocumentCodeType } from "app/config/types/DocumentCodeType"
import { CurrAccType } from "app/config/types/CurrAccType"

export type AgendaDataType = {
  id: string,
  date: string,
  currAccDescription: string,
  currAccType: CurrAccType,
  documentCode: DocumentCodeType,
  value?: TextProps["tx"] | string | number | undefined,

}
interface FinancialCalendarProps {
  agendaData: AgendaDataType[]
}

const initialDate = '2024-07-30';
export const FinancialCalendar: React.FC<FinancialCalendarProps> = ({ agendaData }) => {
  const getDate = (count: number) => {
    const date = new Date(initialDate);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };
  const [selected, setSelected] = useState(initialDate);
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(getDate(0));


  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
    setSelectedDate(day);
  }, []);

  const marked = useMemo(() => {
    return {
      [getDate(-1)]: {
        dotColor: 'red',
        marked: true
      },
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'orange',
        selectedTextColor: 'red'
      }
    };
  }, [selected]);

  const markedDates = agendaData.reduce((acc, data) => {
      acc[data.date] = { marked: true };
    return acc;
  }, {} as { [key: string]: { marked: boolean, dotColor?: string } });



  const filteredAgendaData = agendaData.filter(data => data.date === selected);

  return (
      <WidgetCard title="widgets.financialAgenda.title" headerShown={true}>
        <Calendar
          enableSwipeMonths
          style={{
            paddingBottom: spacing.md,
          }}
          current={initialDate.toString()}
          initialDate={initialDate.toString()}
          theme={{
            calendarBackground: colors.cardBackground,
            textSectionTitleColor: colors.text,
            textSectionTitleDisabledColor: colors.textDim,
            dayTextColor: colors.text,
            todayTextColor: colors.chartPrimary,
            selectedDayTextColor: colors.chartPrimary,
            monthTextColor: colors.text,
            indicatorColor: colors.text,
            selectedDayBackgroundColor: colors.chartPrimary,
            arrowColor: colors.chartPrimary,
            // textDisabledColor: 'red',
            stylesheet: {
              calendar: {
                header: {
                  week: {
                    marginTop: 30,
                    marginHorizontal: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }
                }
              }
            }
          }}
          firstDay={1}
          onDayPress={onDayPress}
          markedDates={markedDates}

        />
        {

          filteredAgendaData.length > 0 ? (
            <>
              <View style={{
                alignItems: 'center',
              }}>
                <Text preset="formLabel" text={selected} />
              </View>
              {
                filteredAgendaData
                  .map((data, index , array) => (
                    <List
                      key={data.id}
                      leftComponentType="dot"
                      label={data.currAccDescription}
                      rightComponent={
                        <View>
                          <Text preset="formLabel">{data.value}</Text>
                        </View>
                      }
                    />
                  ))
              }
            </>

          ) : (
            <View style={{
              alignItems: 'center',
              paddingVertical: spacing.md
            }}>
              <LottieView
                source={{uri: 'https://lottie.host/8674d68c-eac4-49b9-acb0-7c9e68f87e38/5BGZlpNThk.json'}}
                style={$lottieStyle}
                autoPlay
                loop
              />
              <Text preset="subheading">{selected}</Text>
              <Text preset="formLabel" style={{color: colors.textDim}} tx="widgets.financialAgenda.noRecord" />
            </View>
          )
        }

      </WidgetCard>
  )
}


const $lottieStyle: ViewStyle = {
  width: '80%',
  height: 150,
  marginBottom: spacing.xxxs
}
