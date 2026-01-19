import React, { useEffect, useState } from 'react';
import type { ShippingAddress } from '../../types/check-out.ts';

interface ShippingAddressFormProps {
    shippingAddress: ShippingAddress;
    onShippingAddressChange: (field: keyof ShippingAddress, value: string) => void;
    onShippingFeeChange: (fee: number) => void;
}

const FAKE_PROVINCES = [
    { ProvinceID: 201, ProvinceName: "Hà Nội" },
    { ProvinceID: 202, ProvinceName: "Hồ Chí Minh" },
    { ProvinceID: 203, ProvinceName: "Đà Nẵng" },
    { ProvinceID: 204, ProvinceName: "Hải Phòng" },
    { ProvinceID: 205, ProvinceName: "Cần Thơ" },
    { ProvinceID: 206, ProvinceName: "Bình Dương" },
    { ProvinceID: 207, ProvinceName: "Đồng Nai" },
    { ProvinceID: 208, ProvinceName: "Khánh Hòa" },
    { ProvinceID: 209, ProvinceName: "Nghệ An" },
    { ProvinceID: 210, ProvinceName: "Thừa Thiên Huế" },
    { ProvinceID: 211, ProvinceName: "Quảng Ninh" },
    { ProvinceID: 212, ProvinceName: "Bà Rịa - Vũng Tàu" },
    { ProvinceID: 213, ProvinceName: "An Giang" }
];

const FAKE_DISTRICTS: Record<number, any[]> = {
    201: [
        { DistrictID: 1482, DistrictName: "Quận Ba Đình" },
        { DistrictID: 1484, DistrictName: "Quận Đống Đa" }
    ],
    202: [
        { DistrictID: 1442, DistrictName: "Quận 1" },
        { DistrictID: 1444, DistrictName: "Thành phố Thủ Đức" }
    ],
    203: [
        { DistrictID: 1530, DistrictName: "Quận Hải Châu" }
    ],
    204: [
        { DistrictID: 1540, DistrictName: "Quận Hồng Bàng" },
        { DistrictID: 1542, DistrictName: "Quận Lê Chân" }
    ],
    205: [
        { DistrictID: 1550, DistrictName: "Quận Ninh Kiều" },
        { DistrictID: 1552, DistrictName: "Quận Cái Răng" }
    ],
    206: [
        { DistrictID: 1560, DistrictName: "Thành phố Thủ Dầu Một" },
        { DistrictID: 1562, DistrictName: "Thành phố Dĩ An" }
    ],
    207: [
        { DistrictID: 1570, DistrictName: "Thành phố Biên Hòa" },
        { DistrictID: 1572, DistrictName: "Thành phố Long Khánh" }
    ],
    208: [
        { DistrictID: 1580, DistrictName: "Thành phố Nha Trang" },
        { DistrictID: 1582, DistrictName: "Thành phố Cam Ranh" }
    ],
    209: [
        { DistrictID: 1590, DistrictName: "Thành phố Vinh" },
        { DistrictID: 1592, DistrictName: "Thị xã Cửa Lò" }
    ],
    210: [
        { DistrictID: 1600, DistrictName: "Thành phố Huế" },
        { DistrictID: 1602, DistrictName: "Huyện Phú Vang" }
    ],
    211: [
        { DistrictID: 1610, DistrictName: "Thành phố Hạ Long" },
        { DistrictID: 1612, DistrictName: "Thành phố Cẩm Phả" }
    ],
    212: [
        { DistrictID: 1620, DistrictName: "Thành phố Vũng Tàu" },
        { DistrictID: 1622, DistrictName: "Thành phố Bà Rịa" }
    ],
    213: [
        { DistrictID: 1630, DistrictName: "Thành phố Long Xuyên" },
        { DistrictID: 1632, DistrictName: "Thành phố Châu Đốc" }
    ]
};

const FAKE_WARDS: Record<number, any[]> = {
    1482: [{ WardCode: "1001", WardName: "Phường Phúc Xá" }],
    1484: [{ WardCode: "1002", WardName: "Phường Láng Hạ" }],
    1442: [{ WardCode: "2001", WardName: "Phường Bến Nghé" }],
    1444: [{ WardCode: "2002", WardName: "Phường Linh Xuân" }],
    1530: [{ WardCode: "3001", WardName: "Phường Thạch Thang" }],
    1540: [{ WardCode: "4001", WardName: "Phường Hoàng Văn Thụ" }],
    1542: [{ WardCode: "4002", WardName: "Phường Đông Hải" }],
    1550: [{ WardCode: "5001", WardName: "Phường Tân An" }],
    1552: [{ WardCode: "5002", WardName: "Phường Hưng Phú" }],
    1560: [{ WardCode: "6001", WardName: "Phường Hiệp Thành" }],
    1562: [{ WardCode: "6002", WardName: "Phường Dĩ An" }],
    1570: [{ WardCode: "7001", WardName: "Phường Trảng Dài" }],
    1572: [{ WardCode: "7002", WardName: "Phường Xuân An" }],
    1580: [{ WardCode: "8001", WardName: "Phường Vĩnh Hải" }],
    1582: [{ WardCode: "8002", WardName: "Phường Cam Nghĩa" }],
    1590: [{ WardCode: "9001", WardName: "Phường Bến Thủy" }],
    1592: [{ WardCode: "9002", WardName: "Phường Nghi Thủy" }],
    1600: [{ WardCode: "10001", WardName: "Phường Phú Hòa" }],
    1602: [{ WardCode: "10002", WardName: "Xã Phú Mậu" }],
    1610: [{ WardCode: "11001", WardName: "Phường Bãi Cháy" }],
    1612: [{ WardCode: "11002", WardName: "Phường Cẩm Trung" }],
    1620: [{ WardCode: "12001", WardName: "Phường Thắng Tam" }],
    1622: [{ WardCode: "12002", WardName: "Phường Phước Trung" }],
    1630: [{ WardCode: "13001", WardName: "Phường Mỹ Bình" }],
    1632: [{ WardCode: "13002", WardName: "Phường Châu Phú B" }]
};

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
                                                                     shippingAddress, onShippingAddressChange, onShippingFeeChange
                                                                 }) => {
    const [districts, setDistricts] = useState<any[]>([]);
    const [wards, setWards] = useState<any[]>([]);

    const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);
    const [selectedWardCode, setSelectedWardCode] = useState<string>('');

    // Logic giả lập load Quận/Huyện/Xã
    useEffect(() => {
        if (!selectedProvinceId) { setDistricts([]); return; }
        setDistricts(FAKE_DISTRICTS[selectedProvinceId] || []);
    }, [selectedProvinceId]);

    useEffect(() => {
        if (!selectedDistrictId) { setWards([]); return; }
        setWards(FAKE_WARDS[selectedDistrictId] || [{ WardCode: "9999", WardName: "Phường Mẫu" }]);
    }, [selectedDistrictId]);

    // Update state cha
    useEffect(() => {
        const p = FAKE_PROVINCES.find(x => x.ProvinceID === selectedProvinceId);
        if (p) {
            onShippingAddressChange('provinceId', p.ProvinceID.toString());
            onShippingAddressChange('city', p.ProvinceName);
        }
    }, [selectedProvinceId, onShippingAddressChange]);

    useEffect(() => {
        const d = districts.find(x => x.DistrictID === selectedDistrictId);
        if (d) {
            onShippingAddressChange('districtId', d.DistrictID.toString());
            onShippingAddressChange('district', d.DistrictName);
        }
    }, [selectedDistrictId, districts, onShippingAddressChange]);

    useEffect(() => {
        const w = wards.find(x => x.WardCode === selectedWardCode);
        if (w) {
            onShippingAddressChange('wardCode', w.WardCode);
            onShippingAddressChange('ward', w.WardName);
        }
    }, [selectedWardCode, wards, onShippingAddressChange]);

    // Tính phí ship giả
    useEffect(() => {
        if (shippingAddress.districtId && shippingAddress.wardCode) {
            onShippingFeeChange(30000);
        }
    }, [shippingAddress.districtId, shippingAddress.wardCode, onShippingFeeChange]);

    return (
        <div className="mb-6">
            <div className="p-6 border border-gray-300 rounded-lg space-y-4 bg-white shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Địa chỉ giao hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                        className="p-2 border rounded"
                        onChange={(e) => {
                            setSelectedProvinceId(parseInt(e.target.value));
                            setSelectedDistrictId(null); setSelectedWardCode('');
                        }}
                    >
                        <option value="">-- Chọn Tỉnh/Thành --</option>
                        {FAKE_PROVINCES.map(p => <option key={p.ProvinceID} value={p.ProvinceID}>{p.ProvinceName}</option>)}
                    </select>

                    <select
                        className="p-2 border rounded"
                        onChange={(e) => setSelectedDistrictId(parseInt(e.target.value))}
                        disabled={!selectedProvinceId}
                    >
                        <option value="">-- Chọn Quận/Huyện --</option>
                        {districts.map(d => <option key={d.DistrictID} value={d.DistrictID}>{d.DistrictName}</option>)}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                        className="p-2 border rounded"
                        onChange={(e) => setSelectedWardCode(e.target.value)}
                        disabled={!selectedDistrictId}
                    >
                        <option value="">-- Chọn Phường/Xã --</option>
                        {wards.map(w => <option key={w.WardCode} value={w.WardCode}>{w.WardName}</option>)}
                    </select>
                    <input
                        type="text"
                        placeholder="Số nhà, tên đường..."
                        className="p-2 border rounded"
                        value={shippingAddress.address}
                        onChange={(e) => onShippingAddressChange('address', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
export default ShippingAddressForm;