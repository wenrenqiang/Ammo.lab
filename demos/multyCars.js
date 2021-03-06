function demo () {

    cam ({ azim:0, polar:10, distance:30 });
    load ( 'cars', afterLoad );

}

function afterLoad () {

    view.addJoystick();

    set({
        fps:60,
        numStep:2,
        gravity:[0,-10,0],
    })

    // infinie plane
    add({type:'plane'});

    // load cars map
    view.addMap('cars.png', 'cars');
    view.mat.cars.transparent = true;
    view.mat.cars.side = THREE.DoubleSide;
    view.mat.cars.shadowSide = false;

    // create cars
    for (var i = 0; i < CARS.length; i++){
        addVehicle( i, [-25+(i*4), 0,0], 'convex');
    }

    // ! \\ set the car we drive 0 to 13
    // use keyboard to controle car 

    follow ('car_0');
    drive ('car_0');

};

var CARS = [
    { n:'001', name:'fordM'  , radius:0.36, nw:4, w:'1', mass:1109,  wPos:[0.76, 0, 1.46] },
    { n:'002', name:'vaz'    , radius:0.36, nw:4, w:'1', mass:1003,  wPos:[0.72, 0, 1.31] },
    { n:'003', name:'coupe'  , radius:0.36, nw:4, w:'1', mass:900,   wPos:[0.96, 0, 1.49] },
    { n:'004', name:'c4'     , radius:0.40, nw:4, w:'2', mass:1181,  wPos:[0.93, 0, 1.65] },
    { n:'005', name:'ben'    , radius:0.40, nw:4, w:'2', mass:1256,  wPos:[0.88, 0, 1.58] },
    { n:'006', name:'taxi'   , radius:0.40, nw:4, w:'2', mass:1156,  wPos:[0.90, 0, 1.49] },
    { n:'007', name:'207'    , radius:0.40, nw:4, w:'2', mass:1156,  wPos:[0.94, 0, 1.60] },
    { n:'008', name:'police' , radius:0.40, nw:4, w:'2', mass:1400,  wPos:[0.96, 0, 1.67] },
    { n:'009', name:'van1'   , radius:0.46, nw:4, w:'3', mass:2000,  wPos:[1.14, 0, 1.95] },
    { n:'010', name:'van2'   , radius:0.40, nw:4, w:'2', mass:2400,  wPos:[0.89, 0, 2.10] },
    { n:'011', name:'van3'   , radius:0.46, nw:4, w:'3', mass:2400,  wPos:[0.90, 0, 1.83, 0, 0.26] },
    { n:'012', name:'truck1' , radius:0.57, nw:6, w:'4', mass:10000, wPos:[1.00, 0, 2.58, 1.23, 0.18] },
    { n:'013', name:'truck2' , radius:0.57, nw:6, w:'4', mass:14000, wPos:[1.17, 0, 3.64, 2.37] },
    { n:'014', name:'bus'    , radius:0.64, nw:4, w:'5', mass:11450, wPos:[1.25, 0, 2.49] },
];

function addVehicle (id, pos, type) {

    var geo = view.geo;
    var mat = view.mat;

    var o = CARS[id];

    //o.debug = true;


    o.type = type || 'box';
    
    o.pos = pos || [0,0,0];
    //o.pos[1] = o.size[1]*0.5;

    var shape = geo['shape'+o.n];
    var chassis = geo['mcar'+o.n];
    var down = geo['down'+o.n];
    var inside = geo['inside'+o.n] ? geo['inside'+o.n] : null;

    var yy = shape.boundingBox.min.y;

    //console.log(shape.boundingBox.min.y)
    
    var mesh = new THREE.Group();

    //mesh.add( new THREE.Mesh( shape, mat.cars ));

    mesh.add( new THREE.Mesh( chassis, mat.cars ));
    mesh.add( new THREE.Mesh( down, mat.cars ));
    if( inside ) mesh.add( new THREE.Mesh( inside, mat.move ));

    o.wheelMaterial = 'cars';

    // The maximum length of the suspension (metres)
    o.s_length = 0.1;//o.radius;// * 0.5;
    //The maximum distance the suspension can be compressed in Cm 
    //o.s_travel = (o.radius*2)*100;
    // Maximum suspension force
    o.s_force = o.mass*10;

    o.s_compression = 0.84;
    o.s_damping = 0.88;
    o.s_stiffness = 40;

    o.wPos[1] = o.radius;//*2;
    
    o.shape = shape;
    o.mesh = mesh;
    o.wheel = geo[ 'w00' + o.w ];

    o.name = 'car_'+ id;

    o.helper = true;

    car( o );

};