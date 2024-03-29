package com.ssafy.ViewCareFull.domain.users.security.oauth;

import java.util.Map;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class InMemoryProviderRepository {

  private final Map<String, OauthProvider> providers;

  public OauthProvider findByProviderName(String name) {
    return providers.get(name);
  }
}
