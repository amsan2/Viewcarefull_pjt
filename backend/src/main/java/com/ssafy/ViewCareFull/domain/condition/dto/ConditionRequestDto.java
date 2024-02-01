package com.ssafy.ViewCareFull.domain.condition.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.ViewCareFull.domain.common.entity.TimeType;
import com.ssafy.ViewCareFull.domain.condition.entity.Condition;
import com.ssafy.ViewCareFull.domain.condition.entity.ConditionType;
import com.ssafy.ViewCareFull.domain.users.entity.user.Users;
import java.time.LocalDate;
import lombok.Getter;

@Getter
public class ConditionRequestDto {

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
  private LocalDate day;
  private String condition;
  private String time;

  public Condition toEntity(Users user) {
    return Condition.builder()
        .user(user)
        .date(day)
        .condition(ConditionType.valueOf(condition.toUpperCase()))
        .time(TimeType.valueOf(time.toUpperCase()))
        .build();
  }

  @JsonIgnore
  public TimeType getTimeType() {
    return TimeType.valueOf(time.toUpperCase());
  }

  @JsonIgnore
  public ConditionType getConditionType() {
    return ConditionType.valueOf(condition.toUpperCase());
  }
}
