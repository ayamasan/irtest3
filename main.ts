input.onButtonPressed(Button.B, function () {
    for (let index = 0; index < ヘッダー1長; index++) {
        pins.digitalWritePin(DigitalPin.P14, 1)
        for (let index = 0; index < 3; index++) {
            カウンター = pins.digitalReadPin(DigitalPin.P0)
        }
        pins.digitalWritePin(DigitalPin.P14, 0)
        for (let index = 0; index < 周波数長; index++) {
            カウンター = pins.digitalReadPin(DigitalPin.P0)
        }
    }
    for (let index = 0; index < ヘッダー2長; index++) {
        pins.digitalWritePin(DigitalPin.P14, 0)
        for (let index = 0; index < 3; index++) {
            カウンター = pins.digitalReadPin(DigitalPin.P0)
        }
        pins.digitalWritePin(DigitalPin.P14, 0)
        for (let index = 0; index < 周波数長; index++) {
            カウンター = pins.digitalReadPin(DigitalPin.P0)
        }
    }
    basic.pause(100)
})
/**
 * IR送信テスト
 * 
 * 搬送波
 * 
 * ループ回数10＝25us、40KHz
 * 
 * ループ回数12＝28us、36KHz
 */
let カウンター = 0
let ヘッダー2長 = 0
let ヘッダー1長 = 0
let 周波数長 = 0
basic.showIcon(IconNames.Square)
let 値 = 0
pins.digitalWritePin(DigitalPin.P14, 0)
let IRデータ = [
"A",
"8",
"B",
"4",
"8",
"0"
]
周波数長 = 6
ヘッダー1長 = 96
ヘッダー2長 = 24
let _1T = 24
let _3T = 72
