package com.msuf123.bluffarena

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.oney.WebRTCModule.WebRTCModuleOptions;
import android.media.AudioAttributes
import org.webrtc.audio.JavaAudioDeviceModule;
import android.media.AudioManager
import android.bluetooth.BluetoothDevice        // ✅ for ACTION_ACL_CONNECTED/DISCONNECTED
import android.content.BroadcastReceiver        // ✅ for headsetReceiver
import android.content.Context                  // ✅ for onReceive context param
import android.content.Intent                   // ✅ for onReceive intent param
import android.content.IntentFilter 
class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        },
    )
  }

  private val headsetReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val audioManager = getSystemService(AUDIO_SERVICE) as AudioManager
            routeAudio(audioManager)
        }
    }

    private fun routeAudio(audioManager: AudioManager) {
        when {
            audioManager.isWiredHeadsetOn -> {
                audioManager.isSpeakerphoneOn = false
            }
            audioManager.isBluetoothScoOn || audioManager.isBluetoothA2dpOn -> {
                audioManager.isSpeakerphoneOn = false
                audioManager.startBluetoothSco()
            }
            else -> {
                audioManager.isSpeakerphoneOn = true
            }
        }
    }

    override fun onCreate() {
        val options = WebRTCModuleOptions.getInstance()
        val audioAttributes = AudioAttributes.Builder()
            .setUsage(AudioAttributes.USAGE_MEDIA)
            .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
            .build()
        options.audioDeviceModule = JavaAudioDeviceModule.builder(this)
            .setAudioAttributes(audioAttributes)
            .setUseHardwareAcousticEchoCanceler(true)
            .setUseHardwareNoiseSuppressor(true)
            .createAudioDeviceModule()

      

        val filter = IntentFilter(AudioManager.ACTION_HEADSET_PLUG).apply {
            addAction(BluetoothDevice.ACTION_ACL_CONNECTED)
            addAction(BluetoothDevice.ACTION_ACL_DISCONNECTED)
        }
        registerReceiver(headsetReceiver, filter)

        super.onCreate()
        loadReactNative(this)
    }

    override fun onTerminate() {
        unregisterReceiver(headsetReceiver)
        super.onTerminate()
    }
}
