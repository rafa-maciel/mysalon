package com.rmaciel.mysaloon.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public abstract class DateFormatUtil {

    public static String parseToString(LocalDate date) {
        return date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    public static LocalDate parseFromString(String date) {
        return LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

}