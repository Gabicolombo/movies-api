#!/bin/bash
echo ""
echo ""
echo "====> Searching for the tag value..."
path="chart/values.yaml"
value_tag=$(grep "tag" $path | cut -d':' -f2 |tr -d '[:space:]')
echo "Value: $value_tag"
echo ""
echo ""
echo ""
# Creating the image
echo "====> Creating the image..."
docker build -t gcolombo27/movies-api:$value_tag -f Dockerfile .
echo ""
echo ""
echo ""
echo "====> Pushing the image..."
docker push gcolombo27/movies-api:$value_tag

