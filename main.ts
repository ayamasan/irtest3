let カウンター = 0
basic.showIcon(IconNames.Square)
let 値 = 0
pins.digitalWritePin(DigitalPin.P14, 0)
/**
 * IR送信テスト
 * 
 * 搬送波
 * 
 * ループ回数10＝25us、40KHz
 * 
 * ループ回数12＝28us、36KHz
 */
basic.forever(function () {
    for (let index = 0; index < 10; index++) {
        pins.digitalWritePin(DigitalPin.P14, 1)
        for (let index = 0; index < 3; index++) {
            カウンター = pins.digitalReadPin(DigitalPin.P0)
        }
        pins.digitalWritePin(DigitalPin.P14, 0)
        for (let index = 0; index < 7; index++) {
            カウンター = pins.digitalReadPin(DigitalPin.P0)
        }
    }
    basic.pause(100)
})
