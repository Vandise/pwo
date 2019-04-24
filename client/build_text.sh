#!/bin/bash

node ./node_modules/.bin/yaml2json -r text/ > text/out/text.raw.json
echo "[$(cat text/out/text.raw.json)" > tmp.text.json && mv tmp.text.json text/out/text.raw.json
tr '\n' ',\n' < text/out/text.raw.json > tmp.text.json && mv tmp.text.json text/out/text.raw.json
sed 's/[\,]$//' text/out/text.raw.json > tmp.text.json && mv tmp.text.json text/out/text.raw.json
echo ']' >> text/out/text.raw.json

mv text/out/text.raw.json resources/text/gametext.json