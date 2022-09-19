function モード設定 (数値: number) {
    if (数値 == 1) {
        周波数2長 = 7
        ヘッダー1長 = 345
        ヘッダー2長 = 172
        _1T = 21
        _3T = 64
    } else if (数値 == 2) {
        周波数2長 = 7
        ヘッダー1長 = 130
        ヘッダー2長 = 65
        _1T = 16
        _3T = 49
    } else {
        IRデータ数 = IRデータ数 - 1
        周波数1長 = 5
        周波数2長 = 4
        ヘッダー1長 = 98
        ヘッダー2長 = 26
        _1T = 25
        _3T = 49
    }
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Fullstop), function () {
    受信データ = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Fullstop))
    if (受信データ.length > 6) {
        IRモード = parseFloat(受信データ.charAt(0))
        IRデータ数 = parseFloat(受信データ.substr(1, 2))
        パルスくり返し回数 = parseFloat(受信データ.charAt(3))
        パルス間空き時間 = parseFloat(受信データ.substr(4, 2))
        IRデータ = []
        for (let カウンター = 0; カウンター <= 受信データ.length - 6; カウンター++) {
            IRデータ.push(受信データ.charAt(カウンター + 6))
        }
        モード設定(IRモード)
        basic.showIcon(IconNames.Happy)
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.B, function () {
    basic.showArrow(ArrowNames.North)
    送信データ作成()
    for (let index = 0; index < パルスくり返し回数; index++) {
        for (let index = 0; index < ヘッダー1長; index++) {
            pins.digitalWritePin(DigitalPin.P14, LEDオン)
            for (let index = 0; index < 周波数1長; index++) {
                値 = pins.digitalReadPin(DigitalPin.P0)
            }
            pins.digitalWritePin(DigitalPin.P14, LEDオフ)
            for (let index = 0; index < 周波数2長; index++) {
                値 = pins.digitalReadPin(DigitalPin.P0)
            }
        }
        for (let index = 0; index < ヘッダー2長; index++) {
            pins.digitalWritePin(DigitalPin.P14, 0)
            for (let index = 0; index < 周波数1長; index++) {
                値 = pins.digitalReadPin(DigitalPin.P0)
            }
            pins.digitalWritePin(DigitalPin.P14, 0)
            for (let index = 0; index < 周波数2長; index++) {
                値 = pins.digitalReadPin(DigitalPin.P0)
            }
        }
        if (IRモード <= 2) {
            for (let カウンター = 0; カウンター <= IRデータ数; カウンター++) {
                for (let index = 0; index < _1T; index++) {
                    pins.digitalWritePin(DigitalPin.P14, LEDオン)
                    for (let index = 0; index < 周波数1長; index++) {
                        値 = pins.digitalReadPin(DigitalPin.P0)
                    }
                    pins.digitalWritePin(DigitalPin.P14, LEDオフ)
                    for (let index = 0; index < 周波数2長; index++) {
                        値 = pins.digitalReadPin(DigitalPin.P0)
                    }
                }
                for (let index = 0; index < 送信データ[カウンター]; index++) {
                    pins.digitalWritePin(DigitalPin.P14, 0)
                    for (let index = 0; index < 周波数1長; index++) {
                        値 = pins.digitalReadPin(DigitalPin.P0)
                    }
                    pins.digitalWritePin(DigitalPin.P14, 0)
                    for (let index = 0; index < 周波数2長; index++) {
                        値 = pins.digitalReadPin(DigitalPin.P0)
                    }
                }
            }
        } else {
            for (let カウンター = 0; カウンター <= IRデータ数; カウンター++) {
                for (let index = 0; index < 送信データ[カウンター]; index++) {
                    pins.digitalWritePin(DigitalPin.P14, LEDオン)
                    for (let index = 0; index < 周波数1長; index++) {
                        値 = pins.digitalReadPin(DigitalPin.P0)
                    }
                    pins.digitalWritePin(DigitalPin.P14, LEDオフ)
                    for (let index = 0; index < 周波数2長; index++) {
                        値 = pins.digitalReadPin(DigitalPin.P0)
                    }
                }
                for (let index = 0; index < _1T; index++) {
                    pins.digitalWritePin(DigitalPin.P14, 0)
                    for (let index = 0; index < 周波数1長; index++) {
                        値 = pins.digitalReadPin(DigitalPin.P0)
                    }
                    pins.digitalWritePin(DigitalPin.P14, 0)
                    for (let index = 0; index < 周波数2長; index++) {
                        値 = pins.digitalReadPin(DigitalPin.P0)
                    }
                }
            }
        }
        basic.pause(パルス間空き時間)
    }
    basic.clearScreen()
})
function 送信データ作成 () {
    送信データ = []
    for (let カウンター = 0; カウンター <= IRデータ.length; カウンター++) {
        if (IRデータ[カウンター] == "F") {
            値 = 15
        } else if (IRデータ[カウンター] == "E") {
            値 = 14
        } else if (IRデータ[カウンター] == "D") {
            値 = 13
        } else if (IRデータ[カウンター] == "C") {
            値 = 12
        } else if (IRデータ[カウンター] == "B") {
            値 = 11
        } else if (IRデータ[カウンター] == "A") {
            値 = 10
        } else if (IRデータ[カウンター] == "9") {
            値 = 9
        } else if (IRデータ[カウンター] == "8") {
            値 = 8
        } else if (IRデータ[カウンター] == "7") {
            値 = 7
        } else if (IRデータ[カウンター] == "6") {
            値 = 6
        } else if (IRデータ[カウンター] == "5") {
            値 = 5
        } else if (IRデータ[カウンター] == "4") {
            値 = 4
        } else if (IRデータ[カウンター] == "3") {
            値 = 3
        } else if (IRデータ[カウンター] == "2") {
            値 = 2
        } else if (IRデータ[カウンター] == "1") {
            値 = 1
        } else {
            値 = 0
        }
        if (値 >= 8) {
            送信データ.push(_3T)
            値 = 値 - 8
        } else {
            送信データ.push(_1T)
        }
        if (値 >= 4) {
            送信データ.push(_3T)
            値 = 値 - 4
        } else {
            送信データ.push(_1T)
        }
        if (値 >= 2) {
            送信データ.push(_3T)
            値 = 値 - 2
        } else {
            送信データ.push(_1T)
        }
        if (値 >= 1) {
            送信データ.push(_3T)
        } else {
            送信データ.push(_1T)
        }
    }
}
/**
 * IR送信テスト
 * 
 * 搬送波
 * 
 * ループ回数10＝25us、40KHz
 * 
 * ループ回数12＝28us、36KHz
 */
let 受信データ = ""
let 周波数1長 = 0
let _3T = 0
let _1T = 0
let ヘッダー2長 = 0
let ヘッダー1長 = 0
let 周波数2長 = 0
let パルス間空き時間 = 0
let パルスくり返し回数 = 0
let IRモード = 0
let 送信データ: number[] = []
let IRデータ数 = 0
let IRデータ: string[] = []
let 値 = 0
let LEDオフ = 0
let LEDオン = 0
basic.showIcon(IconNames.Square)
LEDオン = 1
LEDオフ = 0
値 = 0
pins.digitalWritePin(DigitalPin.P14, 0)
IRデータ = []
IRデータ数 = 20
送信データ = []
IRモード = 3
パルスくり返し回数 = 5
パルス間空き時間 = 12
モード設定(IRモード)
