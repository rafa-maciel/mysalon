import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import {Calendar as FullCalendar} from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

export default class Calendar {
    constructor(parentSelector, events, onEventClick) {
        let calendarEl = document.querySelector(parentSelector);

        this._calendar = new FullCalendar(calendarEl, {
            locale: ptBrLocale,
            plugins: [ timeGridPlugin, dayGridPlugin ],
            events: events,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            navLinks: true,
            eventClick: (info) => { onEventClick(info)}
        });
        
        this._calendar.render();
    }

}