import { QRCodeSVG } from 'qrcode.react';

const QRCode = ({ value }: { value: string }) => {
    return (
        <QRCodeSVG value={value} />
    )
}

export default QRCode