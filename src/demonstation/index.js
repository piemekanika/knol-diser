import * as THREE from 'three';
import $ from "jquery";

let scene, renderer, light

const degToRad = deg => deg * Math.PI / 180

scene = new THREE.Scene()
scene.background = new THREE.Color(0xe5e5e5)
scene.rotation.x = degToRad(25)
scene.rotation.y = degToRad(25)

light = {}
light.ambient = new THREE.AmbientLight(0xffffff, .6)
light.direct  = new THREE.DirectionalLight(0xffffff, 1)
light.direct.position.set(0, 700, 200);
light.direct.target.position.set(-5, 0, 0)

scene.add(light.ambient)
scene.add(light.direct)
scene.add(light.direct.target)

const $container = $('#app')

step1()

console.log(scene)

function step1() {
    let buildingGeometry    = new THREE.BoxGeometry(40, 20, 20)
    let buildingMaterial    = new THREE.MeshStandardMaterial({ color: 0x878787 })
    let buildingMesh        = new THREE.Mesh(buildingGeometry, buildingMaterial)
    buildingMesh.castShadow = true

    scene.add(buildingMesh)

    let $tool = $('<div class="tool col"></div>').append('Выберите здание (или сооружение)<br><input type="radio" checked> Лабоораторный корпус СГУГиТ')
    let $view = $('<div class="view col"></div>')
    let $row  = $('<div></div>').height(300).append($tool).append($view)
    $container.append($row)

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize($view.width(), $view.height())

    $view.append(renderer.domElement)

    const camera      = new THREE.PerspectiveCamera(45, $view.width() / $view.height(), .1, 100)
    camera.position.z = 60

    renderer.render(scene, camera)
}
