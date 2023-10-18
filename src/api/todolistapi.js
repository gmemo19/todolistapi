const express = require('express');
const { getItems, createItem, updateItem, deleteItem, deleteAllItems, deleteDoneItems } = require('../database/database');

const router = express.Router();

router.get('/', async(req, res) => {
  const gelenVeri = req.query.sero
  console.log(gelenVeri)
  const data = await getItems('SELECT * from todo')
  res.json({ message: 'Merhaba, bu bir API örneğidir!',data });
});

router.post('/createTask', async(req, res) => {
  const title = req?.body?.title
  const description = req?.body?.description
  const status = req?.body?.status
  if (!description) {
    return  res.status(400).json({ message: 'Görev eklenemedi, açıklama eksik '});
  }
  const data = await createItem(title,description,status)
  if (data?.insertId) {
    res.status(200).json({ message: 'Görev başarıyla eklendi' });
  }else{
    res.status(400).json({ message: 'Görev eklenemedi'});
  }
});

router.put('/update/:id',async(req,res) => {
  const {id} = req.params
  const yeniVeri = req.body.description
  const yeniStatus = req.body.status
  

  const guncelGorev = await updateItem(id,yeniVeri,yeniStatus);
  res.json({message: 'Görev başarıyla güncellendi' , guncelGorev});
});

router.delete('/delete/:id', async(req,res) => {
  const {id} = req.params;

  const deleteGorev = await deleteItem(id);
  res.json({message:'Görev başarıyla silindi',deleteGorev});
});

router.delete('/deleteAll', async (req, res) => {
  const deleteAllGorev = await deleteAllItems();
  res.json({ message: 'Tüm görevler başarıyla silindi', deleteAllGorev });
});

router.delete('/deleteDoneTasks', async (req, res) => {
  const deleteAllGorev = await deleteDoneItems();
  res.json({ message: 'Tüm tamamlanan görevler başarıyla silindi', deleteAllGorev });
});



module.exports = router;

// TODO : POST, PUT , DELETE kullanılmalı

