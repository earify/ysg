let a = 1;

function betting_caler(OC, prediction) {
    let betting_multifiler;

    if (prediction == "higher") {
        if (OC == 0) {
            betting_multifiler = 1.1
        }
        if (OC == 1) {
            betting_multifiler = 1.1
        }
        if (OC == 2) {
            betting_multifiler = 1.1
        }
        if (OC == 3) {
            betting_multifiler = 1.15
        }
        if (OC == 4) {
            betting_multifiler = 1.15
        }
        if (OC == 5) {
            betting_multifiler = 1.15
        }
        if (OC == 6) {
            betting_multifiler = 1.15
        }
        if (OC == 7) {
            betting_multifiler = 1.2
        }
        if (OC == 8) {
            betting_multifiler = 1.2
        }
        if (OC == 9) {
            betting_multifiler = 1.3
        }
        if (OC == 10) {
            betting_multifiler = 1.3
        }
        if (OC == 11) {
            betting_multifiler = 1.5
        }
        if (OC == 12) { // K 확률 겁나 낮아서 ㄱㅊ
            betting_multifiler = 3
        } 
    }

    if (prediction == "lower") {
        if (OC == 12) {
            betting_multifiler = 1.1
        }
        if (OC == 11) {
            betting_multifiler = 1.1
        }
        if (OC == 10) {
            betting_multifiler = 1.1
        }
        if (OC == 9) {
            betting_multifiler = 1.15
        }
        if (OC == 8) {
            betting_multifiler = 1.15
        }
        if (OC == 7) {
            betting_multifiler = 1.15
        }
        if (OC == 6) {
            betting_multifiler = 1.15
        }
        if (OC == 5) {
            betting_multifiler = 1.2
        }
        if (OC == 4) {
            betting_multifiler = 1.2
        }
        if (OC == 3) {
            betting_multifiler = 1.3
        }
        if (OC == 2) {
            betting_multifiler = 1.3
        }
        if (OC == 1) {
            betting_multifiler = 1.5
        }
        if (OC == 0) { // A 미만이 없음 (?)
            betting_multifiler = 100
    }}
    
    if (prediction == "red") {
        betting_multifiler = 1.25
    }

    if (prediction == "black") {
        betting_multifiler = 1.25
    }
}

let sans = betting_caler(0, "lower")
console.log(sans)