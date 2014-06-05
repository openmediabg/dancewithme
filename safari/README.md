# Инструкции (OS X)

За да подготвите сами разширението за Safari, ще трябва да го подпишете със сертификат изаден от Apple. За целта трябва да се запишете в [Safari Developer Program](https://developer.apple.com/programs/safari/) - безплатно е. След като се регистрирате трябва да свалите вашия *Safari Extension Certificate*. 

Трябва ни пълния certificate chain и единствения начин е да се извлекат от създадено от вас разширение. За целта трябва да ползвате [Safari Extension Builder](https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/UsingExtensionBuilder/UsingExtensionBuilder.html). Създайте празно разширение със Safari Extension Builder. Натиснете Build Package... Ще получите готовия подписан пакет (.safariextz).

Използвайки `xar`, който е в папката safari изпълнете следната команда в терминала:

    ./път/до/xar -f път/до/вашето_разширение.safariextz --extract-certs .

В текущата директория ще получите 2 серфтификата извлечени от разширението - cert01, cert02. Копирайте ги в директорията safari. 

Отворете Keychain Access, намерете Safari Extension Certificate и го експортирайте в p12 формат. В папката, където е p12 файла изпълнете следните команди в терминала:

    openssl pkcs12 -in име_на_сертификата.p12 -nodes | openssl x509 -outform der -out cert.der
    openssl pkcs12 -in име_на_сертификата.p12 -nodes | openssl rsa -out key.pem

Копирайте key.pem и cert.der отново в safari директорията.

В safari папката в терминала изпълнете следната команда:

    openssl dgst -sign key.pem -binary < key.pem | wc -c > size.txt

Трябва да имате следнте добавени файлове в safari папката - cert.der, key.pem, cert01, cert02 и size.txt. Това са файловете нужни за подписване на разширението. Build скриптът ще се погрижи за изграждане на разширението - изпълнете `./build` в safari папката. Ако искате да изградите наведнъж разширенията за всички браузъри, изпълнете същата команда в parent директорията.

