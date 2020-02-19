# React-Pet-catalog
===========================

Aplikacja pozwalająca na przeglądanie,dodawanie oraz kolekcjonowanie zwierzaków dodawanych przez użytkowników.

Projekt stworzony z użyciem [Create React App](https://github.com/facebook/create-react-app).
Do autoryzacji oraz przechowywania danych posłużył [Google Firebase](https://firebase.google.com/)

## Instalacja

Po pobraniu projektu, należy przejść do katalogu ***/my-app/***, a następnie uruchomić komendę `npm install` w celu instalacji niezbędnych paczek.
Aby uruchomić projekt lokalnie, należy następnie skorzystać z komendy `npm start`.
Projekt uruchomi się domyślnie w przeglądarce na [http://localhost:3000](http://localhost:3000)

## Użytkowanie

Wersję Live można znaleźć pod adresem [https://spearek.github.io/React-Pet-catalog/](https://spearek.github.io/React-Pet-catalog/)

Aby korzystać z wszystkich funkcjonalności projektu, należy być zalogowanym użytkownikiem.
Można zarejestrować się bezpośrednio w aplikacji (rejestracja nie wymaga potwierdzenia maila).

Można również zalogować się za pośrednictwem danych testowych:

*Login: testuser@test.pl*<br/>
*Hasło: testtest*

## Wersje

Projekt został stworzony w dwóch różnych wersjach, w celu zestawienia odmiennych metod tworzenia aplikacji w REACT.
Pierwsze z wersji (dostępna na `master`), jest wersją opierającą się o ***class components*** , ***lifecycle methods*** oraz ***Reduxa***.
Do tej też wersji prowadzi wersja live.

W wersji drugiej (dostępnej na gałęzi `hooks-and-redux`), aplikacja opiera się wyłącznie o ***komponenty funkcyjne*** wraz z ***react hooks*** - tu nadal korzystam z  ***Reduxa***.

Obydwie wersje są w pełni fukcjonalne.

W najbliższym czasie pojawi się trzecia wersja w której ***Redux*** zostanie zastąpiony ***Context API*** - więcej informacji wkrótce..