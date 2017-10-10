<?php namespace App\Repository\Interfaces;

interface ImageInterface
{

	function getById($id);

	function active();

	function deleted();

	function insert($data);

	function update($id, $data);

}