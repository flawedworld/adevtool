#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")"

FACTORY_CARRIERSETTINGS=$1
APNS_OUT=$2
CARRIERCONFIG_OUT=$3

rm -rf __pycache__

./carriersettings_extractor.py $FACTORY_CARRIERSETTINGS $APNS_OUT $CARRIERCONFIG_OUT
