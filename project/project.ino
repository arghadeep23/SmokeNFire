#include <dht.h>

const int mq2Pin = A1;
dht DHT;
#define DHT11_PIN 7

void setup() {
  Serial.begin(9600);
}

void loop() {
  int mq2Value = analogRead(mq2Pin);
  int chk = DHT.read11(DHT11_PIN);
  // Send only numerical sensor values without any additional text
  Serial.print(DHT.temperature);
  Serial.print(",");
  Serial.print(DHT.humidity);
  Serial.print(",");
  Serial.println(mq2Value);
  delay(1000);
}
