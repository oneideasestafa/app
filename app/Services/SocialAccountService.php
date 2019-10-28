<?php

namespace App\Services;

use App\User;
use Laravel\Socialite\Two\User as ProviderUser;

class SocialAccountService {

  /**
   * Find or create user instance by provider user instance and provider name.
   * 
   * @param ProviderUser $providerUser
   * @param string $provider
   * 
   * @return User
   */
  public function findOrCreate(ProviderUser $providerUser, string $provider): User
  {
    $linkedSocialAccount = User::where('tipoCuenta', $provider)
      ->where('providerId', $providerUser->getId())
      ->first();

    if ($linkedSocialAccount) {

      return $linkedSocialAccount;

    } else {
      
      $user = null;
      
      if ($email = $providerUser->getEmail()) {
        $user = User::where('email', $email)->first();
      }

      if (!$user) {
        $user = User::create([
          'nombre' => $providerUser->getName(),
          'apellido' => $providerUser->getName(),
          'email' => $providerUser->getEmail(),
          'tipoCuenta' => $provider,
          'providerId' => $providerUser->getId(),
          'foto' => $providerUser->getAvatar()
        ]);
      }
      
      return $user;
    }
  }
}

?>