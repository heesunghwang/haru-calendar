plugins { id("com.android.application") }

val releaseKeystore = providers.environmentVariable("HARU_KEYSTORE_FILE").orNull

android {
    namespace = "com.haru.calendar"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.haru.calendar"
        minSdk = 26
        targetSdk = 35
        versionCode = 14
        versionName = "1.2.1"
    }

    signingConfigs {
        if (releaseKeystore != null) {
            create("release") {
                storeFile = file(releaseKeystore)
                storePassword = providers.environmentVariable("HARU_KEYSTORE_PASSWORD").get()
                keyAlias = providers.environmentVariable("HARU_KEY_ALIAS").get()
                keyPassword = providers.environmentVariable("HARU_KEY_PASSWORD").get()
            }
        }
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            if (releaseKeystore != null) signingConfig = signingConfigs.getByName("release")
        }
    }
}
