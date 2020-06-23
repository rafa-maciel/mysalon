import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import {Calendar as FullCalendar} from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import AppointmentService from '../services/AppointmentService';
import CalendarEvent from '../models/CalendarEvent';

export default class AppointmentCalendar {
    constructor(parentSelector, onEventClick, extraParameters='') {
        let calendarEl = parentSelector;
        this._service = new AppointmentService();
        this._extraParameters = extraParameters;

        this._calendar = new FullCalendar(calendarEl, {
            height: 750,
            locale: ptBrLocale,
            plugins: [ timeGridPlugin, dayGridPlugin ],
            events: (info, successCallback, failureCallback) => {this._filterAppointments(info, successCallback, failureCallback)},
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

    /**
     * @param {Array} extraParameters
     */
    set extraParameters(extraParameters) {
        this._extraParameters = extraParameters;
        this._calendar.refetchEvents();
    }

    _filterAppointments(info, successCallback, failureCallback) {
        let start = info.startStr.substr(0,10);
        let end = info.endStr.substr(0,10);
        let extra = this._extraParameters;
        let parameters = `date=${start}&dateMax=${end}&dateOperation=BETWEEN&${extra}`;

        this._service.getPageableAppointments(parameters)
            .then(pageable => pageable.content)
            .then(appointments => successCallback(appointments.map(appointment => new CalendarEvent(appointment))))
            .catch(err => failureCallback(err));
    }

}