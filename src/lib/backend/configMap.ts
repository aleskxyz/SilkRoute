import { configGenerator } from "../configGenerator";

export const getConfigMap = (uuid: string) => {
    const path = configGenerator(uuid).path
    return {
        "log": {
            "level": "debug",
            "timestamp": true
        },
        "dns": {
            "servers": [
                {
                    "address": "tcp://1.1.1.1",
                    "detour": "dns"
                },
                {
                    "address": "tcp://1.0.0.1",
                    "detour": "dns"
                }
            ],
            "strategy": "prefer_ipv4"
        },
        "inbounds": [
            {
                "type": "vless",
                "listen": "::",
                "listen_port": 8443,
                "sniff": true,
                "sniff_override_destination": true,
                "domain_strategy": "prefer_ipv4",
                "users": [
                    {
                        "uuid": uuid,
                        "flow": "",
                        "name": "SilkRoute"
                    }
                ],
                "tls": {
                    "enabled": false
                },
                "transport": {
                    "type": "ws",
                    "path": path
                }
            }
        ],
        "outbounds": [
            {
                "type": "direct"
            },
            {
                "type": "direct",
                "tag": "dns"
            },
            {
                "type": "block",
                "tag": "block"
            }
        ],
        "route": {
            "rules": [
                {
                    "geoip": [
                        "private"
                    ],
                    "outbound": "block"
                },
                {
                    "geosite": [
                        "category-ads-all"
                    ],
                    "outbound": "block"
                },
                {
                    "ip_cidr": [
                        "0.0.0.0/8",
                        "10.0.0.0/8",
                        "100.64.0.0/10",
                        "127.0.0.0/8",
                        "169.254.0.0/16",
                        "172.16.0.0/12",
                        "192.0.0.0/24",
                        "192.0.2.0/24",
                        "192.168.0.0/16",
                        "198.18.0.0/15",
                        "198.51.100.0/24",
                        "203.0.113.0/24",
                        "::1/128",
                        "fc00::/7",
                        "fe80::/10"
                    ],
                    "outbound": "block"
                },
                {
                    "network": "tcp",
                    "port": [
                        25,
                        587,
                        465,
                        2525
                    ],
                    "outbound": "block"
                },
                {
                    "domain": [
                        "pushnotificationws.com",
                        "sunlight-leds.com",
                        "icecyber.org"
                    ],
                    "outbound": "block"
                }
            ]
        }
    }
}
