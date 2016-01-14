/**   _   _____ _   _   
*    | | |_   _| |_| |
*    | |_ _| | |  _  |
*    |___|_|_| |_| |_|
*    @author lo.th / http://lo-th.github.io/labs/
*    AMMO LAB MAIN
*/

'use strict';

// main transphere array for worker
var Br, Cr, Jr, Hr, Sr;

var demos = [ 
    'basic', 'terrain', 'supermaket', 'car', 'collision', 'ragdoll',
    'kinematics', 'multyCars', 'snowboard', 'cloth', 'rope', 'ellipsoid',
    'softmesh', 'softmeshbase', 'pigtest', 'testmesh', 'meshmove',
    'character', 'meca', 'joints', 'empty'
];

var demo;
var demoName = 'basic';

//////////////////////////////


var direct = false;
var isWithCode = false;

function init(){

    view.init( afterLoad );

};

function afterLoad () {

    user.init();
    editor.init( launch, isWithCode );
    ammo.init( ready, direct );
    loop();

};


function loop () {

    requestAnimationFrame(loop);
    view.render();

};

function ready () {

    var hash = location.hash.substr( 1 );

    if(hash !=='') demoName = hash;
    editor.load('demos/' + demoName + '.js');

};

function launch (name) {

    location.hash = name;

    ammo.reset();
    view.reset();

    demo = new window['demo'];

};

function add ( o ) { view.add( o ); };

function joint ( o ) { o.type = o.type == undefined ? 'joint' : o.type; view.add( o ); };

function character ( o ) { view.character( o ); };

function car ( o ) { view.vehicle( o ); };

function drive ( name ) { view.setDriveCar( name ); };

function follow ( name ) { view.setFollow( name ); };

function substep ( substep ) { ammo.send( 'substep', {substep:substep} ) ; };

function cam ( h,v,d,t ){ view.moveCamera( h, v, d, 0, t || { x:0, y:0, z:0 } ); };

function tell ( str ) { editor.tell( str ); };

function load ( name, callback ) { view.load( name, callback ); };

function anchor ( o ) { ammo.send( 'anchor', o ); };
