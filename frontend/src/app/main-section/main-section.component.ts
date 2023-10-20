import { Component } from '@angular/core';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: []
})
export class MainSectionComponent {
  questions = [
    {
      id: '1',
      title: 'Quelle est la signification de la vie ?',
      content: 'J\'aimerais comprendre la signification profonde de la vie.Quelqu\'un peut-il m\'aider ? ',
      type: 1,
      owner: 'Alice Smith',
      date: new Date('2023-09-15'),
    },
    {
      id: '2',
      title: 'Comment apprendre à jouer de la guitare rapidement ?',
      content: 'Je veux apprendre à jouer de la guitare en peu de temps. Des conseils seraient appréciés.',
      type: 2,
      owner: 'Bob Johnson',
      date: new Date('2023-09-16'),
    },
    {
      id: '3',
      title: 'Quels sont les meilleurs livres de science-fiction ?',
      content: 'Je suis à la recherche de bonnes suggestions de livres de science-fiction à lire. Merci !',
      type: 1,
      owner: 'Carol Davis',
      date: new Date('2023-09-17'),
    },
    {
      id: '4',
      title: 'Comment préparer une tarte aux pommes délicieuse ?',
      content: 'Je veux impressionner mes amis avec une tarte aux pommes incroyable. Des recettes ?',
      type: 2,
      owner: 'David Wilson',
      date: new Date('2023-09-18'),
    },
  ];
}

