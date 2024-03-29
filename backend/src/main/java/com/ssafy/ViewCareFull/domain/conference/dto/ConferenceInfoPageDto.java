package com.ssafy.ViewCareFull.domain.conference.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConferenceInfoPageDto {

  private List<ConferenceInfo> reservedConferenceList;
}
