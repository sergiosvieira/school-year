// const _ = require('lodash');
// const df = require('dateformat');
// const logic_days = [3, 4, 5];

// var hours = [
//     "07:30 - 08:29",
//     "08:30 - 09:30",
//     "09:45 - 10:44",
//     "10:45 - 11:45",
//     "13:15 - 14:14",
//     "14:15 - 15:15",
//     "15:30 - 16:29",
//     "16:30 - 17:30",
//     "18:15 - 19:07",
//     "19:05 - 19:54"
// ];

// var holidays = [
//     new Date('2019-08-31T00:00:01'),
//     new Date('2019-09-07T00:00:01'),
//     new Date('2019-09-24T00:00:01'),
//     new Date('2019-10-04T00:00:01'),
//     new Date('2019-10-12T00:00:01'),
//     new Date('2019-10-28T00:00:01'),
//     new Date('2019-11-02T00:00:01'),
//     new Date('2019-11-15T00:00:01'),
//     new Date('2019-08-31T00:00:01')
// ];

// var hours_weekend = {
//     "07:30 - 08:29": "Qua",
//     "08:30 - 09:30": "Qua",
//     "09:45 - 10:44": "Sex",
//     "10:45 - 11:45": "Sex",
//     "13:15 - 14:14": "Qui",
//     "14:15 - 15:15": "Qui",
//     "15:30 - 16:29": "",
//     "16:30 - 17:30": "",
//     "18:15 - 19:07": "",
//     "19:05 - 19:54": "",
// };

// var weekend_class = {
//     "Qua": "Lóg. Prog - SL 07",
//     "Qui": "Lóg. Prog - SL 07",
//     "Sex": "Lóg. Prog - SL 07"
// }

// var ch_week = 2;

// var dayToDayWeekend = (day) => {
//     var daysWeekend = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
//     return daysWeekend[day];
// };
// var days_counter = 7;
// var initial = new Date('2019-07-21T00:00:01');

// var current_ch = 0;
// for (var week = 0; week < 21; ++week)
// {    
//     var week_date = new Date(initial);
//     var str = "| Dia/Horário | ";
//     for (var day = 0; day < days_counter; ++day)
//     {
//         //var date_string = week_date.toISOString().slice(0, 10);
//         var date_string = df(week_date, "dd/mm/yyyy");
//         str += dayToDayWeekend(week_date.getDay()) 
//             + ' - ' + date_string
//             + ' | ';
//         week_date.setDate(week_date.getDate() + 1);
//     }
//     str += "\n"
//     str += "| --- | ";
//     for (var day = 0; day < days_counter; ++day)
//     {
//         str += " --- |";
//     }
//     str += "\n";
//     for (var h = 0; h < hours.length; ++h)
//     {
//         str += '| ' + hours[h];
//         for (var i = 0; i < days_counter; ++i)
//         {
   
//             var w = hours_weekend[hours[h]];
//             var w_str = dayToDayWeekend(i);
//             if ( w_str === w) 
//             {                
//                 current_ch += 1;
//                 str += ' | ' + weekend_class[w];
//             }
//             str += " |";
//             week_date.setDate(week_date.getDate() + 1);
//         }
//         if (h < hours.length - 1) str += "\n";
//     }
//     console.log(str);
//     initial.setDate(initial.getDate() + 7);
//     console.log("Carga Horária Completada: " + current_ch);
//     console.log("\\pagebreak");
//     console.log();
// }

const _ = require('lodash');
const _df = require("dateformat");
const days_in_the_week = 7;
const holidays = [
    new Date(2019, 7, 31),
    new Date(2019, 8, 07),
    new Date(2019, 8, 24),
    new Date(2019, 9, 04),
    new Date(2019, 9, 12),
    new Date(2019, 9, 28),
    new Date(2019, 10, 02),
    new Date(2019, 10, 15),
    new Date(2019, 7, 31)
];
var isHoliday = (date) => {
    var obj = _.find(holidays, (d) => {
        return d.getTime() == date.getTime();
    });
    return typeof obj != 'undefined';
};
const HourEnum = {
    SEVEN_EIGHT: 0,
    EIGHT_NINE: 1,
    NINE_TEN: 2,
    TEN_ELEVEN: 3,
    THIRTEEN_FOURTEEN: 4,
    FOURTEEN_FIVETEEN: 5,
    FIVETEEN_SIXTEEN: 6,
    SIXTEEN_SEVENTEEN: 7,
    EIGHTEEN_NINETEEN: 8,
    NINETEEN_TWENTY: 9
};
const HourProperties = 
{
    0: {name: "07:30 - 08:29", value: HourEnum.SEVEN_EIGHT},
    1: {name: "08:30 - 09:30", value: HourEnum.EIGHT_NINE},
    2: {name: "09:45 - 10:44", value: HourEnum.NINE_TEN},
    3: {name: "10:45 - 11:45", value: HourEnum.TEN_ELEVEN},
    4: {name: "13:15 - 14:14", value: HourEnum.THIRTEEN_FOURTEEN},
    5: {name: "14:15 - 15:15", value: HourEnum.FOURTEEN_FIVETEEN},
    6: {name: "15:30 - 16:29", value: HourEnum.FIVETEEN_SIXTEEN},
    7: {name: "16:30 - 17:30", value: HourEnum.SIXTEEN_SEVENTEEN},
    8: {name: "18:15 - 19:07", value: HourEnum.EIGHTEEN_NINETEEN},
    9: {name: "19:05 - 19:54", value: HourEnum.NINETEEN_TWENTY}
};
const HourEnumSize = Object.keys(HourEnum).length;
const DayWeekEnum = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6
};
var DayProperties = {
        0: {name: "Dom", value: DayWeekEnum.SUNDAY},
        1: {name: "Seg", value: DayWeekEnum.MONDAY},
        2: {name: "Ter", value: DayWeekEnum.TUESDAY},
        3: {name: "Qua", value: DayWeekEnum.WEDNESDAY},
        4: {name: "Qui", value: DayWeekEnum.THURSDAY},
        5: {name: "Sex", value: DayWeekEnum.FRIDAY},
        6: {name: "Sáb", value: DayWeekEnum.SATURDAY}
};
const DayWeekEnumSize = Object.keys(DayWeekEnum).length;
// Functions
var WeekendStr = (day) => {
    return days_weekend[day];
};
var AcademicWeek = (initial_date, total, schedule, testday) => {
    var result = "| Dia/Horário |";
    var date_week = new Date(initial_date);
    Object.keys(DayWeekEnum).forEach((key) => {
        var date_string = _df(date_week, "dd/mm/yyyy");
        result += ' ' 
            + DayProperties[DayWeekEnum[key]].name 
            + ' - '
            + date_string
            + ' |';
        date_week.setDate(date_week.getDate() + 1);
    });
    result += '\n| --- |';
    Object.keys(DayWeekEnum).forEach((key) => {
        result += ' --- |';
    });
    result += '\n';    
    Object.keys(HourEnum).forEach((key_h) => {
        var hour_name = HourProperties[HourEnum[key_h]].name;
        var hour_value = HourProperties[HourEnum[key_h]].value;
        result += '| ' + hour_name + ' |';
        date_week = new Date(initial_date);
        Object.keys(DayWeekEnum).forEach((key_d) => {
            if (!isHoliday(date_week))
            {
                var day_name = DayProperties[DayWeekEnum[key_d]].name;
                var day_value = DayProperties[DayWeekEnum[key_d]].value;
                var obj_schedule = _.find(schedule, (obj) => {
                    return obj.day_week == day_value;
                });
                if (typeof obj_schedule == 'undefined') {
                    result += ' |';
                } else {
                    var obj_hour = _.find(obj_schedule.hours, (hour_index) => {
                        return hour_index == hour_value;
                    });
                    if (typeof obj_hour == 'undefined') {
                        result += ' |';
                    } else {
                        result += ' X ';
                        var obj_test = _.find(testday, (test_obj) => {
                            return test_obj.date.getTime() == date_week.getTime();
                        });
                        if (typeof obj_test != 'undefined'
                            && obj_test.hour == hour_value) {
                            result += '- ' + obj_test.desc;
                        } else {
                            ++total.value;
                        }
                        result += ' |';
                    }
                }
            } else {
                result += ' F |';
            }
            date_week.setDate(date_week.getDate() + 1);
        });
        result += '\n';
    });
    return result;
};
var AcademicSemester = (date, class_name, schedule, test_day) => {
    var initial_date = new Date(date);
    var total = {value: 0};    
    var str = "# " + class_name + '\n';
    for (var week = 0; week < 21; ++week)
    {
        str += AcademicWeek(initial_date, total, schedule, test_day);
        str += "\nCarga Horária: " + total.value + ' horas\n\n';
        initial_date.setDate(initial_date.getDate() + 7);
    }
    return str;
};
var init_date = new Date(2019, 6, 21);
const ClassTestDeadline = [
    new Date(2019, 7, 27),
    new Date(2019, 9, 1),
    new Date(2019, 10, 8),
    new Date(2019, 11, 16)
];
// Disciplina: Lógica de Programação
const LogicSchedule = [
    {day_week: DayWeekEnum.WEDNESDAY, 
        hours: [HourEnum.SEVEN_EIGHT, HourEnum.EIGHT_NINE]},
    {day_week: DayWeekEnum.THURSDAY, 
        hours: [HourEnum.THIRTEEN_FOURTEEN, HourEnum.FOURTEEN_FIVETEEN]},
    {day_week: DayWeekEnum.FRIDAY, 
        hours: [HourEnum.NINE_TEN, HourEnum.TEN_ELEVEN]}
];
const LogicTestDay = [
    {date: new Date(2019, 7, 14), hour: HourEnum.SEVEN_EIGHT, desc: "T"},// Aviso de Trabalho
    {date: new Date(2019, 7, 21), hour: HourEnum.SEVEN_EIGHT, desc: "N1.1"},// Entrega de Trabalho
    {date: new Date(2019, 8, 18), hour: HourEnum.SEVEN_EIGHT, desc: "P"},// Aviso de Prova
    {date: new Date(2019, 8, 25), hour: HourEnum.SEVEN_EIGHT, desc: "N1.2"},// Aplicação de Prova

    {date: new Date(2019, 9, 25), hour: HourEnum.SEVEN_EIGHT, desc: "T"},// Aviso de Trabalho
    {date: new Date(2019, 10, 8), hour: HourEnum.SEVEN_EIGHT, desc: "N2.1"},// Entrega de Trabalho
    {date: new Date(2019, 10, 29), hour: HourEnum.SEVEN_EIGHT, desc: "P"},// Aviso de Prova
    {date: new Date(2019, 11, 6), hour: HourEnum.SEVEN_EIGHT, desc: "N2.2"},// Aplicação de Prova
];
console.log(AcademicSemester(
    init_date, 
    "Lógica de Programação", 
    LogicSchedule, 
    LogicTestDay
));
console.log();
// Disciplina: Administração de Sistemas Operacionais
const AdmSOSchedule = [
    {day_week: DayWeekEnum.WEDNESDAY, 
        hours: [HourEnum.NINE_TEN, HourEnum.TEN_ELEVEN]}
];
const AdmSOTestDay = [
    {date: new Date(2019, 7, 14), hour: HourEnum.NINE_TEN, desc: "T"},// Aviso de Trabalho
    {date: new Date(2019, 7, 21), hour: HourEnum.NINE_TEN, desc: "N1.1"},// Entrega de Trabalho
    {date: new Date(2019, 8, 18), hour: HourEnum.NINE_TEN, desc: "P"},// Aviso de Prova
    {date: new Date(2019, 8, 25), hour: HourEnum.NINE_TEN, desc: "N1.2"},// Aplicação de Prova

    {date: new Date(2019, 9, 25), hour: HourEnum.NINE_TEN, desc: "T"},// Aviso de Trabalho
    {date: new Date(2019, 10, 8), hour: HourEnum.NINE_TEN, desc: "N2.1"},// Entrega de Trabalho
    {date: new Date(2019, 10, 29), hour: HourEnum.NINE_TEN, desc: "P"},// Aviso de Prova
    {date: new Date(2019, 11, 6), hour: HourEnum.NINE_TEN, desc: "N2.2"},// Aplicação de Prova
];
console.log(AcademicSemester(
    init_date, 
    "Administração de Sistemas Operacionais", 
    AdmSOSchedule, 
    AdmSOTestDay
));
