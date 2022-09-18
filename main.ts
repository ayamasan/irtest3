function モード設定 (数値: number) {
    if (数値 == 1) {
        周波数長 = 7
        ヘッダー1長 = 345
        ヘッダー2長 = 172
        _1T = 21
        _3T = 64
    } else if (数値 == 2) {
        周波数長 = 7
        ヘッダー1長 = 130
        ヘッダー2長 = 65
        _1T = 16
        _3T = 49
    } else {
        周波数長 = 4
        ヘッダー1長 = 96
        ヘッダー2長 = 24
        _1T = 24
        _3T = 72
    }
}
input.onButtonPressed(Button.B, function () {
    送信データ作成()
    for (let index = 0; index < ヘッダー1長; index++) {
        pins.digitalWritePin(DigitalPin.P14, 1)
        for (let index = 0; index < 3; index++) {
            値 = pins.digitalReadPin(DigitalPin.P0)
        }
        pins.digitalWritePin(DigitalPin.P14, 0)
        for (let index = 0; index < 周波数長; index++) {
            値 = pins.digitalReadPin(DigitalPin.P0)
        }
    }
    for (let index = 0; index < ヘッダー2長; index++) {
        pins.digitalWritePin(DigitalPin.P14, 0)
        for (let index = 0; index < 3; index++) {
            値 = pins.digitalReadPin(DigitalPin.P0)
        }
        pins.digitalWritePin(DigitalPin.P14, 0)
        for (let index = 0; index < 周波数長; index++) {
            値 = pins.digitalReadPin(DigitalPin.P0)
        }
    }
    for (let カウンター = 0; カウンター <= IRデータ数; カウンター++) {
        for (let index = 0; index < 送信データ[カウンター]; index++) {
            pins.digitalWritePin(DigitalPin.P14, 1)
            for (let index = 0; index < 3; index++) {
                値 = pins.digitalReadPin(DigitalPin.P0)
            }
            pins.digitalWritePin(DigitalPin.P14, 0)
            for (let index = 0; index < 周波数長; index++) {
                値 = pins.digitalReadPin(DigitalPin.P0)
            }
        }
        for (let index = 0; index < _1T; index++) {
            pins.digitalWritePin(DigitalPin.P14, 0)
            for (let index = 0; index < 3; index++) {
                値 = pins.digitalReadPin(DigitalPin.P0)
            }
            pins.digitalWritePin(DigitalPin.P14, 0)
            for (let index = 0; index < 周波数長; index++) {
                値 = pins.digitalReadPin(DigitalPin.P0)
            }
        }
    }
    basic.pause(100)
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
let _3T = 0
let _1T = 0
let ヘッダー2長 = 0
let ヘッダー1長 = 0
let 周波数長 = 0
let 送信データ: number[] = []
let IRデータ数 = 0
let IRデータ: string[] = []
let 値 = 0
basic.showIcon(IconNames.Square)
値 = 0
pins.digitalWritePin(DigitalPin.P14, 0)
IRデータ = [
"A",
"2",
"3",
"D",
"4",
"8",
"B",
"7"
]
IRデータ数 = 32
送信データ = []
let IRモード = 1
