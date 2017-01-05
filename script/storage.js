  $( document ).ready(function () {

    const DB_NAME = 'users';
    const DB_VERSION = 1;
    const DB_STORE_NAME = 'user';

    var db;

    function openDb() {
      console.log("openDb ...");
      var req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onsuccess = function (evt) {

        db = this.result;
        console.log("openDb.onsuccess: DONE");
      };
      req.onerror = function (evt) {
        console.error("openDb.onerror:", evt.target.errorCode);
      };

      req.onupgradeneeded = function (evt) {
        console.log("openDb.onupgradeneeded");
        var store = evt.currentTarget.result.createObjectStore(
          DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });

        store.createIndex('name', 'name', { unique: true });
      };
      console.log('Finished openingDB.');
    }

    function getObjectStore(store_name, mode) {
      var tx = db.transaction(store_name, mode);
      return tx.objectStore(store_name);
    }

    function clearObjectStore(store_name) {
      var store = getObjectStore(DB_STORE_NAME, 'readwrite');
      var req = store.clear();
      req.onsuccess = function(evt) {
        printListToConsole(store);
      };
      req.onerror = function (evt) {
        console.error("clearObjectStore.onerror:", evt.target.errorCode);
      };
    }

    function printListToConsole(store) {
      console.log("displayPubList");

      if (typeof store == 'undefined')
        store = getObjectStore(DB_STORE_NAME, 'readonly');

      var req;
      req = store.count();
      req.onsuccess = function(evt) {
        console.log('There are ' + evt.target.result + ' record(s) in the object store.');
      };
      req.onerror = function(evt) {
        console.error("printListToConsole Error", this.error);
      };

      var i = 0;
      req = store.openCursor();
      req.onsuccess = function(evt) {
        var cursor = evt.target.result;

        if (cursor) {
          console.log("displayPubList cursor:", cursor);
          req = store.get(cursor.key);
          req.onsuccess = function (evt) {
            var value = evt.target.result;
            console.log('[' + cursor.key + '] ' + 'Name: ' + value.name + '  Password: ' + value.password);    
          };

          cursor.continue();

          i++;
        } else {
          console.log("No more entries");
        }
      };
    }

    function addPerson(name, password, forecast) {
      console.log("addPerson:", arguments);
      var store = getObjectStore(DB_STORE_NAME, 'readwrite');
      var req = store.index('name');
      req.get(name).onsuccess = function(evt) {
        if (typeof evt.target.result == 'undefined') {
          updatePerson(name, password, forecast);      
        } else {
          deleteToUpdatePerson(evt.target.result.id, store, name, password, forecast);        
        }
      };
      req.onerror = function (evt) {
        console.error("addPerson:", evt.target.errorCode);
        updatePerson(name, password, forecast);      
      };
    }

    function deleteToUpdatePerson(key, store, name, password, forecast) {
      console.log("deleteToUpdatePerson:", arguments);

      if (typeof store == 'undefined')
        store = getObjectStore(DB_STORE_NAME, 'readwrite');

      var req = store.get(key);
      req.onsuccess = function(evt) {
        var record = evt.target.result;
        console.log("record:", record);
        if (typeof record == 'undefined') {
          return;
        }

        req = store.delete(key);
        req.onsuccess = function(evt) {
          console.log("evt:", evt);
          console.log("evt.target:", evt.target);
          console.log("evt.target.result:", evt.target.result);
          console.log("delete successful");
          printListToConsole(store);
          updatePerson(name, password, forecast);
        };
        req.onerror = function (evt) {
          console.error("deletePerson:", evt.target.errorCode);
        };
      };
      req.onerror = function (evt) {
        console.error("deleteToUpdatePerson:", evt.target.errorCode);
      };
    }

    function updatePerson(name, password, forecast) {
      console.log("updatePerson arguments:", arguments);
      var obj = { name: name, password: password, forecast: forecast };

      var store = getObjectStore(DB_STORE_NAME, 'readwrite');
      var req;

      req = store.add(obj);

      req.onsuccess = function (evt) {
        console.log("Insertion in DB successful");
        printListToConsole(store);
        alert('The forecast of user "' + name + '" was saved successfully!\nMake sure you remember your password to recover your forecast.');
      };
      req.onerror = function() {
        console.error("addPerson error", this.error);
      };
    }

    function deletePerson(name) {
      console.log("deletePerson:", arguments);
      var store = getObjectStore(DB_STORE_NAME, 'readwrite');
      var req = store.index('name');
      req.get(name).onsuccess = function(evt) {
        if (typeof evt.target.result == 'undefined') {
          return;
        }
        deletePerson(evt.target.result.id, store);
      };
      req.onerror = function (evt) {
        console.error("deletePerson:", evt.target.errorCode);
      };
    }

    function deletePerson(key, store) {
      console.log("deletePerson:", arguments);

      if (typeof store == 'undefined')
        store = getObjectStore(DB_STORE_NAME, 'readwrite');

      var req = store.get(key);
      req.onsuccess = function(evt) {
        var record = evt.target.result;
        console.log("record:", record);
        if (typeof record == 'undefined') {
          return;
        }

        req = store.delete(key);
        req.onsuccess = function(evt) {
          console.log("evt:", evt);
          console.log("evt.target:", evt.target);
          console.log("evt.target.result:", evt.target.result);
          console.log("delete successful");
          displayPubList(store);
        };
        req.onerror = function (evt) {
          console.error("deletePerson:", evt.target.errorCode);
        };
      };
      req.onerror = function (evt) {
        console.error("deletePerson:", evt.target.errorCode);
      };
    }

    function loadPerson(name, password) {
      console.log("loadPerson:", arguments);
      var store = getObjectStore(DB_STORE_NAME, 'readonly');
      var req = store.index('name');
      req.get(name).onsuccess = function(evt) {
        if (typeof evt.target.result == 'undefined') {
          console.log('loadPerson: error');
          alert('There are no records for such a user!');
          return;
        } else {
          checkPassword(evt.target.result.id, store, name, password);        
        }
      };
      req.onerror = function (evt) {
        console.error("loadPerson:", evt.target.errorCode);
      };
    }

    function checkPassword(key, store, name, password) {
      console.log('checkPassword:' + password);
      if (typeof store == 'undefined')
        store = getObjectStore(DB_STORE_NAME, 'readonly');

      var req = store.get(key);
      req.onsuccess = function(evt) {
        var record = evt.target.result;
        console.log("record:", record);
        if (typeof record == 'undefined') {
          return;
        }
        console.log('User: ' + name);
        console.log('Password value from database: ' + record.password);
        if(password == record.password) {
          console.log('The passwords match!');
          var forecast = record.forecast;
          $('.draggable').each(function( index ) {
            $( this ).text(forecast[index].content);
          });
          teamsRefreshList();
          alert('The forecast of user "' + name + '" was loaded successfully!');
        } else {
          alert('The password inserted is incorrect!');
          return;
        }

      };
      req.onerror = function (evt) {
        console.error("checkPassword:", evt.target.errorCode);
      };
    }

    function addEventListeners() {
      console.log("addEventListeners");

      $('#saveButton').click(function(evt) {
        console.log("saving ...");
        var name = $('[name="username"]').val();
        var password = $('[name="password"]').val();

        //build the forecast array
        var forecast = $('.draggable').map(function(){
          return {
            classname: 'draggable',
            content: $(this).text()
          };
        }).get();

        if (!name) {
          alert("Please fill a username!");
          $('#usernameTextBox').focus();
          return;
        }
        if (!password) {
          alert("Please fill a password!");
          $('#passwordTextBox').focus();
          return;
        }
        addPerson(name, password, forecast);
      });

      $('#loadButton').click(function(evt) {
        console.log("loading ...");
        var name = $('[name="username"]').val();
        var password = $('[name="password"]').val();

        if (name == "") {
          alert('You need to fill a username!');
          $('#usernameTextBox').focus();
          return;
        }
        if (password == "") {
          alert('You need to fill a password!');
          $('#passwordTextBox').focus();
          return;
        }

        loadPerson(name, password);
      });

      $('#clearAll').click(function(evt) {
        clearObjectStore();
      });

      $('#loadAllButton').click(function(evt) {
        printListToConsole();
      });

      console.log('Finished adding event listeners.');
    }
    openDb();
    addEventListeners();

  });