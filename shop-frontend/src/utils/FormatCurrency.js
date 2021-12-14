export default function FormatCurrency(num) {
    return num.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
}