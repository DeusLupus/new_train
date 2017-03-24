// Initialize Firebase
var config = {
apiKey: "AIzaSyDu0QMc_PaOMTQaL4cbXzNcWJr1GdJBHto",
authDomain: "newtrain-a4c54.firebaseapp.com",
databaseURL: "https://newtrain-a4c54.firebaseio.com",
storageBucket: "newtrain-a4c54.appspot.com",
messagingSenderId: "940483134000"
};

firebase.initializeApp(config);

var trainData = firebase.database();

//get user input with button
$('#addTrainBtn').on('click', function() {
	var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var firstTrain = moment($('#firstTrainInput').val().trim(), 'HH:mm').subtract(10, "years").format('X');
	var frequency = $('#frequencyInput').val().trim();

//assign values
	var newTrain = {
		name: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	}
//push to firebase
	trainData.ref().push(newTrain);

	alert('Train Added!');

	$('#trainNameInput').val('');
	$('#destinationInput').val('');
	$('#firstTrainInput').val('');
	$('#frequencyInput').val('');

	return false;
})
//collect info from firebase
trainData.ref().on('child_added', function(snapshot){
	var name = snapshot.val().name;
	var destination = snapshot.val().destination;
	var frequency = snapshot.val().frequency;
	var firstTrain = snapshot.val().firstTrain;

	var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
	var minutes = frequency - remainder;
	var arrival = moment().add(minutes, 'm').format('hh:mm A');

//push info to table
	$('#trainTable > tbody').append('<tr><td>'+ name + '</td><td>' + destination + '</td><td>' + frequency + '</td><td>' + arrival + '</td><td>' + minutes + '</td></tr>');	
})