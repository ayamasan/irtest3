let カウンター = 0
basic.showIcon(IconNames.Square)
let 値 = 0
pins.digitalWritePin(DigitalPin.P14, 0)
basic.forever(function () {
    for (let index = 0; index < 10; index++) {
        if (値 == 0) {
            値 = 1
            pins.digitalWritePin(DigitalPin.P14, 1)
        } else {
            値 = 0
            pins.digitalWritePin(DigitalPin.P14, 0)
        }
        for (let index = 0; index < 12; index++) {
            カウンター = pins.digitalReadPin(DigitalPin.P0)
        }
    }
    basic.pause(100)
})
